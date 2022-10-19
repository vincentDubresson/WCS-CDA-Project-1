import { gql } from "@apollo/client";

export const GET_WILDERS = gql`
  query getWilders {
    wilders {
      id
      firstName
      lastName
      description
      picture
      isTeacher
      school {
        schoolName
        id
      }
      skills {
        skillName
        id
      }
    }
  }
`;

export const GET_WILDER = gql`
  query wilder($wilderId: String!) {
    wilder(id: $wilderId) {
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
