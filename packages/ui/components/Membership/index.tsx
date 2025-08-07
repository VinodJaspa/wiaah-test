import { MembershipCard } from '@sections/AccountSettings'
import React from 'react'

export default function ChooseMembership() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MembershipCard
                title="Basic"
                price="Free"
                features={["Limited listings", "Basic analytics"]}
            />

            <MembershipCard
                title="Standard"
                price="$19.99"
                features={["Unlimited listings", "Advanced analytics", "Priority support"]}
                isRecommended
            />

            <MembershipCard
                title="Premium"
                price="$49.99"
                features={["Unlimited listings", "Advanced analytics", "24/7 support", "Exclusive features"]}
            />
        </div>

    )
}
