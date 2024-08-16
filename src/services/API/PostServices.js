import { SERVER_URL } from "../../utils/constant";
import {
  POSTRequestOptionForFormData,
  GETRequestOption,
  POSTRequestOption,
  PUTRequestOption,
  DELETERequestOptionWithBody
} from "./headers";

export const addPost = async (postData) => {
  return await fetch(
    `${SERVER_URL}/posts/add_post/`,
    POSTRequestOptionForFormData(postData)
  );
};

export const getAllPosts = async () => {
  return await fetch(`${SERVER_URL}/posts/get_all_posts/`, GETRequestOption());
};

export const addVote = async (data) => {
  return await fetch(`${SERVER_URL}/posts/add_vote/`, POSTRequestOption(data));
};

export const addComment = async (data) => {
  return await fetch(
    `${SERVER_URL}/posts/add_comment/`,
    POSTRequestOption(data)
  );
};

export const updateComment = async (data) => {
  return await fetch(
    `${SERVER_URL}/posts/update_comment/`,
    PUTRequestOption(data)
  );
};


export const deleteComment = async (data) => {
  return await fetch(
    `${SERVER_URL}/posts/delete_comment/`,
    DELETERequestOptionWithBody(data)
  );
};