import React from "react";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { formatDate, daysUntil } from "./helpers";
import {
  Card,
  CardTitle,
  SubInfo,
  SubRow,
  SubLabel,
  SubValue,
  PlanBadge,
  UpgradeLink,
  EmptyState,
} from "./styles";

const SubscriptionCard: React.FC = () => {
  const { subscription } = useAppSelector((s) => s.subscription);

  const isFreeForever =
    subscription?.isActive &&
    subscription.planTier === "Free" &&
    new Date(subscription.endDate).getFullYear() > 9000;

  return (
    <Card>
      <CardTitle>
        <FaCrown size={16} />
        Subscription
      </CardTitle>

      {subscription?.isActive ? (
        <SubInfo>
          <SubRow>
            <SubLabel>Plan</SubLabel>
            <PlanBadge $tier={subscription.planTier}>
              {subscription.planName}
              {subscription.isTrial && " (Trial)"}
            </PlanBadge>
          </SubRow>
          <SubRow>
            <SubLabel>Tier</SubLabel>
            <SubValue>{subscription.planTier}</SubValue>
          </SubRow>
          <SubRow>
            <SubLabel>Billing</SubLabel>
            <SubValue>{subscription.billingPeriod}</SubValue>
          </SubRow>
          <SubRow>
            <SubLabel>Started</SubLabel>
            <SubValue>{formatDate(subscription.startDate)}</SubValue>
          </SubRow>
          {!isFreeForever && (
            <>
              <SubRow>
                <SubLabel>
                  {subscription.isTrial ? "Trial ends" : "Renews / Expires"}
                </SubLabel>
                <SubValue>{formatDate(subscription.endDate)}</SubValue>
              </SubRow>
              <SubRow>
                <SubLabel>Time remaining</SubLabel>
                <SubValue>{daysUntil(subscription.endDate)}</SubValue>
              </SubRow>
            </>
          )}
          {isFreeForever && (
            <SubRow>
              <SubLabel>Expires</SubLabel>
              <SubValue>Never</SubValue>
            </SubRow>
          )}

          {subscription.planTier !== "Enterprise" && (
            <Link href="/plans" passHref legacyBehavior>
              <UpgradeLink>
                {subscription.planTier === "Free"
                  ? "Upgrade Plan"
                  : "Change Plan"}
              </UpgradeLink>
            </Link>
          )}
        </SubInfo>
      ) : (
        <SubInfo>
          <EmptyState>
            You don&apos;t have an active subscription.
          </EmptyState>
          <Link href="/plans" passHref legacyBehavior>
            <UpgradeLink>View Plans</UpgradeLink>
          </Link>
        </SubInfo>
      )}
    </Card>
  );
};

export default SubscriptionCard;
