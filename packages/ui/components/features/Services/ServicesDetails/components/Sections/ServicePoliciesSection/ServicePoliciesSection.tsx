import { ServicePoliciesType } from "api";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface ServicePoliciesSectionProps extends ServicePoliciesType {}

export const ServicePoliciesSection: React.FC<ServicePoliciesSectionProps> = ({
  policies,
}) => {
  const { t } = useTranslation();
  const policiesRef = usePublishRef((keys) => keys.polices);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold" ref={policiesRef ?? undefined}>
        {t("Policies")}
      </p>
      <div className="flex gap-2 flex-col">
        {Array.isArray(policies)
          ? policies.map((policy, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="font-bold">{t(policy.policyTitle)}</p>

                <div className="flex flex-col">
                  {Array.isArray(policy.policyTerms)
                    ? policy.policyTerms.map((term, i) => (
                        <p className="font-semibold" key={i}>
                          - {term}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
