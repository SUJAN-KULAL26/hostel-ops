import axios from "axios";

export const getComments = async (complaintId, token) => {
  const res = await axios.get(`/api/comments/${complaintId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addComment = async (complaintId, message, token) => {
  const res = await axios.post(
    `/api/comments/${complaintId}`,
    { message },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return res.data;
};

export const deleteComment = async (commentId, token) => {
  const res = await axios.delete(`/api/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};