import { gql } from "@apollo/client";

export const CREATE_WILDER = gql`
  mutation createWilder(
    $firstName: String!
    $lastName: String!
    $description: String!
    $isTeacher: Boolean!
    $schoolName: String!
    $skills: [String!]!
    $picture: String
  ) {
    createWilder(
      firstName: $firstName
      lastName: $lastName
      description: $description
      isTeacher: $isTeacher
      schoolName: $schoolName
      skills: $skills
      picture: $picture
    ) {
      firstName
      lastName
      description
      isTeacher
      school {
        schoolName
      }
      skills {
        skillName
      }
    }
  }
`;

export const UPDATE_WILDER = gql`
  mutation updateWilder(
    $firstName: String!
    $lastName: String!
    $description: String!
    $isTeacher: Boolean!
    $schoolName: String!
    $skills: [String!]!
    $updateWilderId: ID!
    $picture: String
  ) {
    updateWilder(
      firstName: $firstName
      lastName: $lastName
      description: $description
      isTeacher: $isTeacher
      schoolName: $schoolName
      skills: $skills
      id: $updateWilderId
      picture: $picture
    ) {
      id
      firstName
      lastName
      description
      picture
      isTeacher
      school {
        schoolName
      }
      skills {
        skillName
      }
    }
  }
`;

export const DELETE_WILDER = gql`
  mutation deleteWilder($deleteWilderId: String!) {
    deleteWilder(id: $deleteWilderId) {
      firstName
      lastName
      description
      picture
      isTeacher
      school {
        schoolName
      }
      skills {
        skillName
      }
    }
  }
`;
