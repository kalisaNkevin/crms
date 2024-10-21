import { useQueries } from "@tanstack/react-query";
import {
  getTotalBounceRate,
  getTotalPageViews,
  getTotalSessionDuration,
  getTotalUniqueVisitors,
} from ".";
import { QUERY_KEYS } from "../query-keys";

export const useGetAnalytics = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.TOTAL_PAGE_VIEWS],
        queryFn: getTotalPageViews,
      },
      {
        queryKey: [QUERY_KEYS.TOTAL_UNIQUE_VISITORS],
        queryFn: getTotalUniqueVisitors,
      },
      {
        queryKey: [QUERY_KEYS.TOTAL_BOUNCE_RATE],
        queryFn: getTotalBounceRate,
      },
      {
        queryKey: [QUERY_KEYS.TOTAL_SESSION_DURATION],
        queryFn: getTotalSessionDuration,
      },
    ],
  });

  const [pageQuery, visitorsQuery, bounceQuery, sessionQuery] = result;

  return {
    pagesCount: pageQuery?.data,
    visitorsCount: visitorsQuery?.data,
    bouncesCount: bounceQuery?.data,
    sessionsCount: sessionQuery?.data,
  };
};
