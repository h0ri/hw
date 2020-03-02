/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlan = /* GraphQL */ `
  query GetPlan($content: String!, $owner: String!) {
    getPlan(content: $content, owner: $owner) {
      content
      type
      name
      owner
      person {
        name
        color
        owner
      }
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $content: String
    $owner: ModelStringKeyConditionInput
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPlans(
      content: $content
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        content
        type
        name
        owner
        person {
          name
          color
          owner
        }
      }
      nextToken
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($name: String!) {
    getPerson(name: $name) {
      name
      color
      owner
    }
  }
`;
export const listPersons = /* GraphQL */ `
  query ListPersons(
    $name: String
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPersons(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        color
        owner
      }
      nextToken
    }
  }
`;
