"use client"

export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    institution: string;
    degrees: string[];
    fields?: string;
    position?: string;
    profilePicture?: string;
    bio?: string;
    isMentor: boolean;
    subspecialties: string;

    // recommend deleting this
    mentorProfile?: {
        institution: string;
        affiliation: string;
        field: string;
        position: string;
    },

    isMentee: boolean;
    // expertise: [
    //  We will make this multiple choice for now, select a few things you're experienced in
    // interests: [
    //  Twin for this as well

    // recommend deleting all of this and creating their own models?
    connectionRequests?: string[];
    connections?: string[];
    interactionLogs?: string[];
    resetPasswordToken?: string; // Token for password reset
    resetPasswordExpires?: Date; // Time until token expiration
    createdAt: Date;
    updatedAt: Date;
}