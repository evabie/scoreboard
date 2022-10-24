import axios from "axios";
import type { IApiDataResponse, TMatchesData } from "api/types";

// I used a sample API and skipped types for parts of data response that are not necessary

export const getMatchResults = async (
  season_id: string,
  date_from: string,
  date_to: string
): Promise<TMatchesData> => {
  try {
    const payload = await axios.get<IApiDataResponse<TMatchesData>>(
      `${process.env.REACT_APP_API_BASE_URL}/soccer/matches`,
      {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          season_id,
          date_from,
          date_to,
        },
      }
    );
    return payload.data.data;
  } catch (reason) {
    throw reason;
  }
};
