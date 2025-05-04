"use client";
import { useTasks } from "@/context/taskContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import React, { useEffect, useState } from "react";

function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = React.useRef(null);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Use the hook to detect clicks outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  // Validation logic
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!task.title || !task.title.trim()) newErrors.title = "Title is required";
    if (!task.description || !task.description.trim()) newErrors.description = "Description is required";
    if (!task.priority) newErrors.priority = "Priority is required";
    // dueDate is NOT required anymore
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden flex items-center justify-center">
      <form
        action=""
        className="py-5 px-2 sm:px-6 max-w-[95vw] sm:max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className={`bg-[#F9F9F9] p-2 rounded-md border ${errors.title ? "border-red-400" : ""}`}
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title || ""}
            onChange={(e) => handleInput("title")(e)}
            required
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`bg-[#F9F9F9] p-2 rounded-md border resize-none ${errors.description ? "border-red-400" : ""}`}
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description || ""}
            onChange={(e) => handleInput("description")(e)}
            required
          />
          {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">
            Select Priority <span className="text-red-500">*</span>
          </label>
          <select
            className={`bg-[#F9F9F9] p-2 rounded-md border cursor-pointer ${errors.priority ? "border-red-400" : ""}`}
            name="priority"
            value={task.priority || ""}
            onChange={(e) => handleInput("priority")(e)}
            required
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <span className="text-red-500 text-xs">{errors.priority}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">
            Due Date
          </label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={task.dueDate || ""}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        {/* Only show "Task Completed" input in add mode */}
        {modalMode === "edit" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="completed">Task Completed</label>
            <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
              <label htmlFor="completed">Completed</label>
              <div>
                <select
                  className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                  name="completed"
                  value={task.completed ? "true" : "false"}
                  onChange={(e) => handleInput("completed")(e)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          <span className="text-red-500">*</span> Required fields
        </div>
      </form>
    </div>
  );
}

export default Modal;
