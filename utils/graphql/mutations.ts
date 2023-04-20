import { gql } from "@apollo/client";

export const ADD_NEW_CHECKIN = gql`
  mutation insert_check_in_one(
    $name: String
    $image_url: String
    $comment: String
  ) {
    insert_check_in_one(
      object: { name: $name, image_url: $image_url, comment: $comment }
    ) {
      id
    }
  }
`;
