import React from "react";

const TodoListLayout = ({ maxHeight = "max-h-90", children }) => {
  return (
    <div className={`w-auto ${maxHeight} overflow-y-auto`}>
      {children}
    </div>
  );
};

export default TodoListLayout;
