import React, { createContext } from "react";
import BlogData from '../../assets/Blog Content/Blog'

export const BlogContext = createContext(null);
const contextValue = { BlogData }

const BlogContextProvider = (props) => {


    return (
        <BlogContext.Provider value={contextValue}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;