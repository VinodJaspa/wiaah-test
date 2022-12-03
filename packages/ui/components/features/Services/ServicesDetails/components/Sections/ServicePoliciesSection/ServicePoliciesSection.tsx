import { ServicePoliciesType } from "api";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { PriceDisplay, Divider } from "ui";

export interface ServicePoliciesSectionProps extends ServicePoliciesType {
  title: string;
}

export const ServicePoliciesSection: React.FC<ServicePoliciesSectionProps> = ({
  policies,
  deposit,
  title,
}) => {
  const { t } = useTranslation();
  const policiesRef = usePublishRef((keys) => keys.polices);
  return (
    <div ref={policiesRef} className="flex flex-col gap-4">
      <p className="font-bold text-3xl text-black text-opacity-80">{title}</p>
      {Array.isArray(policies)
        ? policies.map((policy, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="font-bold">{t(policy.policyTitle)}</p>

              <div className="flex flex-col">
                {Array.isArray(policy.policyTerms)
                  ? policy.policyTerms.map((term, i) => (
                      <p
                        className="font-normal text-lg text-black text-opacity-50"
                        key={i}
                      >
                        {term}
                      </p>
                    ))
                  : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
