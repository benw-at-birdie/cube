import { useState, useEffect, useRef } from 'react';
import { gql, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { de } from 'date-fns/locale';

const DBT_SEMANTIC_LAYER_URL = process.env.REACT_APP_DBT_SEMANTIC_LAYER_URL;
const DBT_SEMANTIC_LAYER_ENVIRONMENT_ID = process.env.REACT_APP_DBT_SEMANTIC_LAYER_ENVIRONMENT_ID;
const DBT_SEMANTIC_LAYER_SERVICE_TOKEN = process.env.REACT_APP_DBT_SEMANTIC_LAYER_SERVICE_TOKEN;

// Define the mutation to create a query
const CREATE_QUERY_MUTATION = gql`
  mutation CreateQuery($environmentId: BigInt!,
                       $metrics: [MetricInput!]!,
                       $groupBy: [GroupByInput!],
                       $where: [WhereInput!],
                       $orderBy: [OrderByInput!]) {
    createQuery(
      environmentId: $environmentId,
      metrics: $metrics,
      groupBy: $groupBy,
      where: $where,
      orderBy: $orderBy
    ) {
      queryId
    }
  }
`;

// Define the query to fetch the query result
const FETCH_QUERY_RESULT = gql`
  query FetchQueryResult($environmentId: BigInt!, $queryId: String!) {
    query(environmentId: $environmentId, queryId: $queryId) {
      sql
      status
      error
      totalPages
      jsonResult(orient: TABLE, encoded: true)
    }
  }
`;

function useDbtSLQuery(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Setup Apollo Client
  const httpLink = new HttpLink({ uri: DBT_SEMANTIC_LAYER_URL });
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${DBT_SEMANTIC_LAYER_SERVICE_TOKEN}`,
      },
    });
    return forward(operation);
  });
  const link = authLink.concat(httpLink);
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  const queryInitiatedRef = useRef(false);

  useEffect(() => {

    // Exit early if the query has already been initiated
    if (queryInitiatedRef.current) {
      return;
    }

    // Mark as initiated to prevent future executions
    queryInitiatedRef.current = true;

    const fetchData = async () => {

      setLoading(true);
      try {
        // Step 1: Create the query to get queryId
        const createResponse = await client.mutate({
          mutation: CREATE_QUERY_MUTATION,
          variables: {
            environmentId: parseInt(DBT_SEMANTIC_LAYER_ENVIRONMENT_ID),
            metrics: query.metrics,
            groupBy: query.groupBy,
            where: query.where,
            orderBy: query.orderBy
          },
        });

        const queryId = createResponse.data.createQuery.queryId;

        // Step 2: Poll for the query result using the obtained queryId
        let fetchResult;
        do {
          fetchResult = await client.query({
            query: FETCH_QUERY_RESULT,
            variables: {
              environmentId: parseInt(DBT_SEMANTIC_LAYER_ENVIRONMENT_ID),
              queryId,
            },
            fetchPolicy: "network-only",
          });

          // Implement your logic for handling the "loading" status, e.g., wait or retry after a delay
          if (fetchResult.data.query.status !== "SUCCESSFUL") {
            // Wait for 2 seconds before retrying if not successful
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } while (fetchResult.data.query.status !== "SUCCESSFUL" && fetchResult.data.query.status !== "FAILED");

        if (fetchResult.data.query.status === "SUCCESSFUL") {
          // Transform and set the data
          const decodedJsonResult = decodeJsonResult(fetchResult.data.query.jsonResult);

          console.log('fetchResult.data', fetchResult.data);
          console.log('decodedJsonResult', decodedJsonResult);
          setData(transformDataToMatchCubeQuery(decodedJsonResult));
        } else {
          setError(fetchResult.data.query.error);
        }
      } catch (error) {
        setError(error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [query, client]);

  return {
    isLoading: loading,
    resultSet: data,
    error,
  };
}

// Assuming jsonResult is the base64-encoded string you've received
function decodeJsonResult(jsonResult) {
  // Decode from base64
  const decodedString = atob(jsonResult);
  // Parse the JSON string to an object
  const parsedResult = JSON.parse(decodedString);
  return parsedResult;
}


// Adapt this function based on the structure of dbt's jsonResult
function transformDataToMatchCubeQuery(jsonResult) {
  // Assuming jsonResult is already the format we need or do the necessary transformation
  return jsonResult;
}

export { useDbtSLQuery };
