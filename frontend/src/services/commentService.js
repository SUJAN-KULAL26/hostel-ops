import api from "./api";

export const getComments = async (complaintId, token) => {
  const res = await api.get(`/api/comments/${complaintId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addComment = async (complaintId, message, token) => {
  const res = await api.post(
    `/api/comments/${complaintId}`,
    { message },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return res.data;
};

export const deleteComment = async (commentId, token) => {
  const res = await api.delete(`/api/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};