/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlan = /* GraphQL */ `
  subscription OnCreatePlan($owner: String!) {
    onCreatePlan(owner: $owner) {
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
export const onUpdatePlan = /* GraphQL */ `
  subscription OnUpdatePlan($owner: String!) {
    onUpdatePlan(owner: $owner) {
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
export const onDeletePlan = /* GraphQL */ `
  subscription OnDeletePlan($owner: String!) {
    onDeletePlan(owner: $owner) {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($owner: String!) {
    onCreatePerson(owner: $owner) {
      name
      color
      owner
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($owner: String!) {
    onUpdatePerson(owner: $owner) {
      name
      color
      owner
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($owner: String!) {
    onDeletePerson(owner: $owner) {
      name
      color
      owner
    }
  }
`;
