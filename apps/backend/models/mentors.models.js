import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    institution:  { type: String },
    affiliation:  { type: String },
    field:        { type: String },
    position:     { type: String }
})