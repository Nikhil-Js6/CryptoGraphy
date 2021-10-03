import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'b58de4fa2bmsh28d81186d441e37p1307cejsnd099c796e35d'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'crypto',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest( `/coins?limit=${count}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest( `/exchanges`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest( `/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: (coinId, timePeriod) => createRequest( `/coin/${coinId}/history/${timePeriod}`),
        }),
    })
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;    //Same from endpoints just add 'use' at star and 'Query' at the end.
