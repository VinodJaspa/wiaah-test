import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  AccountRegisteredEvent,
  AccountRestrictedEvent,
  AccountTermsAndConditionViolationEvent,
  AppointmentRefusedEvent,
  ChangePasswordEvent,
  KafkaPayload,
  MembershipRenewalFailEvent,
  NewRegisterationTokenRequestedEvent,
  OrderCreatedEvent,
  OrderShippingEvent,
  ServiceBookedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { MailJetTemplateIds } from '@mailing/const';
import { BaseController } from '@mailing/abstraction';
import {
  GetServiceDataQuery,
  GetServiceDataQueryRes,
  GetUserDataQuery,
  GetUserDataQueryRes,
} from '@mailing/queries';
import { renderFile } from 'ejs';

@Controller()
export class MailingController extends BaseController {
  private logger = new Logger(MailingController.name);

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.accountRegistered)
  sendVerificationMail(
    @Payload() payload: KafkaPayload<AccountRegisteredEvent>,
  ) {
    const {
      value: {
        input: { email, firstName, verificationCode },
      },
    } = payload;
    return this.mailingService.sendVerificationMail(
      email,
      firstName,
      verificationCode,
    );
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.newRegisterationTokenRequest)
  handleResendRegisterationCode(
    @Payload() { value }: { value: NewRegisterationTokenRequestedEvent },
  ) {
    const { email, token } = value.input;
    return this.mailingService.sendVerificationMail(email, 'User', token);
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.passwordChangeRequest)
  sendPasswordChangeMail(
    @Payload() payload: KafkaPayload<ChangePasswordEvent>,
  ) {
    try {
      const {
        value: {
          input: { email, name, verificationCode },
        },
      } = payload;
      return this.mailingService.sendPasswordChangeMail(
        email,
        name,
        verificationCode,
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderCreated('*', true))
  handleOrderCreatedMail(@Payload() { value }: { value: OrderCreatedEvent }) {}

  @EventPattern(KAFKA_EVENTS.SHIPPING_EVENTS.orderShippingStarted('*', true))
  handleOrderShippingStartMail(
    @Payload() { value }: { value: OrderShippingEvent },
  ) {
    const {
      input: { buyer, order, seller },
    } = value;
    this.mailingService.sendTemplateMail({
      templateId: MailJetTemplateIds.SHIPPING_STARTED,
      to: [{ email: buyer.email, name: buyer.name }],
      vars: {
        order_id: order.id,
        buyer_name: buyer.name,
        seller_name: seller.name,
      },
      subject: 'Wiaah Order Shipping Confirmation',
    });
  }

  @EventPattern(KAFKA_EVENTS.MEMBERSHIP.memberShipRenewalFailWarning())
  handleMembershipRenewalFail(
    @Payload() { value }: { value: MembershipRenewalFailEvent },
  ) {
    this.mailingService.sendTemplateMail({
      templateId: MailJetTemplateIds.MEMBERSHIP_WARNING,
      to: [
        { email: value.input.customerEmail, name: value.input.customerName },
      ],
      vars: {
        customer_name: value.input.customerName,
        payment_type: value.input.type,
      },
      subject: 'URGENT: Your Account Need Action',
    });
  }

  @EventPattern(KAFKA_EVENTS.SERVICES.serviceBooked('*', true))
  async handleBookingConfirmationEmail(
    @Payload() { value }: { value: ServiceBookedEvent },
  ) {
    const user = await this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.id));
    const html = await renderFile('./templates/test.ejs');
    this.mailingService.sendRawTemplate({
      to: [{ email: user.email, name: user.name }],
      subject: 'Booking Confirmation',
      html,
    });
  }

  @EventPattern(
    KAFKA_EVENTS.ACCOUNTS_EVENTS.accountTermsAndConditionViolation(),
  )
  async handleTermsAndConditionsViolation(
    @Payload() { value }: { value: AccountTermsAndConditionViolationEvent },
  ) {
    const user = await this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.id));
    this.mailingService.sendTemplateMail({
      templateId: 4411383,
      subject: 'account suspension for terms and condition violation',
      vars: {
        customer_name: user.name,
      },
      to: [{ email: user.email, name: user.name }],
    });
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountRestricted())
  async handleAccountRestricted(
    @Payload() { value }: { value: AccountRestrictedEvent },
  ) {
    const user = await this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.id));
    this.mailingService.sendTemplateMail({
      templateId: 4411499,
      subject: 'Account Restriction',
      vars: {
        customer_name: user.name,
        restriction_reason: value.input.reason,
      },
      to: [{ email: user.email, name: user.name }],
    });
  }

  @EventPattern(KAFKA_EVENTS.SERVICES.appointmentRefused('*'))
  async handleAppointmentRefused(
    @Payload() { value }: { value: AppointmentRefusedEvent },
  ) {
    const seller = await this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.sellerId));

    const buyer = await this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.buyerId));

    const service = await this.querybus.execute<
      GetServiceDataQuery,
      GetServiceDataQueryRes
    >(new GetServiceDataQuery(value.input.id, value.input.buyerId));

    this.mailingService.sendTemplateMail({
      templateId: 4462192,
      subject: 'Appointment Refused',
      vars: {
        customer_name: buyer.name,
        refuse_reason: value.input.reason,
        service_name: service.name,
        seller_name: seller.name,
        booked_at: new Date(value.input.bookedAt).toDateString(),
      },
      to: [{ email: buyer.email, name: buyer.name }],
    });
  }
}
