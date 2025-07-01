import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Reply } from "../types/Comment";

interface CommentState {
  comments: Comment[];
  replies: { [parentId: string]: Reply[] };
}

const initialState: CommentState = {
  comments: [],
  replies: {},
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setReplies: (
      state,
      action: PayloadAction<{ parentId: string; replies: Reply[] }>
    ) => {
      const { parentId, replies } = action.payload;
      state.replies[parentId] = replies;
    },
  },
});

export const { setComments, setReplies } = commentSlice.actions;
export default commentSlice.reducer;
