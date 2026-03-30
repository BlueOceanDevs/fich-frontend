import { useAppSelector } from "@/store/hooks";

const TIER_LEVELS: Record<string, number> = {
  Free: 0,
  Pro: 1,
  Enterprise: 2,
};

/**
 * Hook to check if the current user's plan meets a minimum tier requirement.
 *
 * Usage:
 *   const { hasPro, hasEnterprise, currentTier } = usePlanAccess();
 *   if (!hasPro) return <UpgradePrompt />;
 */
export function usePlanAccess() {
  const { subscription } = useAppSelector((s) => s.subscription);

  const currentTier = subscription?.isActive ? subscription.planTier : null;
  const currentLevel = currentTier ? (TIER_LEVELS[currentTier] ?? 0) : -1;

  return {
    currentTier,
    isSubscribed: subscription?.isActive ?? false,
    isTrial: subscription?.isTrial ?? false,
    hasFree: currentLevel >= 0,
    hasPro: currentLevel >= 1,
    hasEnterprise: currentLevel >= 2,
  };
}
