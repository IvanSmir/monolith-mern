import { Request, Response } from "express";
import Project, { IProject } from "../models/project.model";
import Task from "../models/task.model";
import Comment from "../models/comment.model";
import { uploadFile } from "../utils/uploadImage";
import { uploadFileSupabase } from "../utils/uploadImageSupabase";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;
    const projects = await Project.find({ projectId });
    res.json(projects);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ _id: id }).populate("client");
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    const comments = await Comment.find({ projectId: id });
    const projectObject = { ...project.toObject(), comments };
    res.json(projectObject);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const getProjectToView = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ _id: id }).populate("client");
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    const tasks = await Task.find({ projectId: id });
    const comments = await Comment.find({ projectId: id });
    const projectObject = { ...project.toObject(), comments, tasks };
    res.json(projectObject);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      client,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
      isOnline,
      demoUrl,
    } = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const images = files?.["image"] as Express.Multer.File[] | undefined;
    let project: IProject;
    if (images && images.length > 0) {
      const { downloadUrl } = await uploadFileSupabase(
        images[0],
        name,
        "projects"
      );
      project = new Project({
        userId,
        client,
        name,
        description,
        image: downloadUrl,
        startDate,
        endDate,
        status,
        isOnline,
        demoUrl,
      });
    } else {
      project = new Project({
        userId,
        client,
        name,
        description,
        startDate,
        endDate,
        status,
        isOnline,
        demoUrl,
      });
    }

    await project.save();
    res.status(201).json({ message: "Project created", data: project });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      userId,
      clientId,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
      isOnline,
      demoUrl,
    } = req.body;
    console.log(demoUrl);
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const images = files?.["image"] as Express.Multer.File[] | undefined;
    let project;
    if (images && images.length > 0) {
      const { downloadUrl } = await uploadFileSupabase(
        images[0],
        name,
        "projects"
      );
      project = await Project.findByIdAndUpdate(id, {
        name,
        description,
        image: downloadUrl,
        startDate,
        endDate,
        status,
        isOnline,
        demoUrl,
      });
    } else {
      project = await Project.findByIdAndUpdate(id, {
        name,
        description,
        startDate,
        endDate,
        status,
        isOnline,
        demoUrl,
      });
    }

    console.log(project);

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project updated", data: project });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndUpdate(id, { isDeleted: true });
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    const tasks = await Task.find({ projectId: id });
    for (const task of tasks) {
      task.isDeleted = true;
      await task.save();
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    errorHandling(error, res);
  }
};

const errorHandling = (error: any, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
};
