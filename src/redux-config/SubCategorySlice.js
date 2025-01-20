import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../URL/url.js";

export const fetchSubCategory = createAsyncThunk("SubCategorySlice/fetchSubCategory", async () => {
    try {
        let response = await axios.get(url.subCategory.all);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
});

const slice = createSlice({
    name: "SubCategorySlice",
    initialState: {
        SubcategoryList: [],
        error: false,
        isLoading: false
    },
    reducers: {
        deleteSubCategory: (state, action) => {
            if (window.confirm("Are you sure ? ")) {
                let index = action.payload;
                state.SubcategoryList.splice(index, 1);
                //state.SubcategoryList = [...state.SubcategoryList];
            }
        },
        addSubCategory: (state, action) => {
            state.SubcategoryList.push(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSubCategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchSubCategory.fulfilled, (state, action) => {
            state.SubcategoryList = action.payload;
            state.isLoading = false;
        }).addCase(fetchSubCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Oops ! something went wrong..."
        })
    }
});

export const { deleteSubCategory, addSubCategory } = slice.actions;
export default slice.reducer;