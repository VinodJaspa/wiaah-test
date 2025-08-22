import { ServicePolicy } from "api";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface ServicePoliciesSectionProps {
  title: string;
  policies: ServicePolicy[];
}

export const ServicePoliciesSection: React.FC<ServicePoliciesSectionProps> = ({
  policies,
  title,
}) => {
  const { t } = useTranslation();
  const policiesRef = usePublishRef((keys) => keys.policies);

  return (
    <div ref={policiesRef} className="flex flex-col gap-3">
      {/* Smaller section title */}
      <p className="font-semibold text-xl text-black text-opacity-80">
        {title}
      </p>

      {Array.isArray(policies)
        ? policies.map((policy, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              {/* Smaller policy title */}
              <p className="font-semibold text-sm text-black">
                {t(policy.policyTitle)}
              </p>

              <div className="flex flex-col gap-1">
                {Array.isArray(policy.terms)
                  ? policy.terms.map((term, i) => (
                      <p
                        className="font-normal text-xs text-gray-600"
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
