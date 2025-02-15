"use client"

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: string,
    institution: string,
    degrees: string[],
    profilePicture: string,
    bio: string,
    isMentor: boolean,
    subspecialties: string,

    // recommend deleting this
    mentorProfile: {
        institution: { type: String },
        affiliation: { type: String },
        field: { type: String },
        position: { type: String }
    },

    isMentee: boolean,
    // expertise: [
    //  We will make this multiple choice for now, select a few things you're experienced in
    // interests: [
    //  Twin for this as well

    // recommend deleting all of this and creating their own models?
    connectionRequests: undefined,
    connections: undefined,
    interactionLogs: undefined,
    resetPasswordToken: String,  // Token for password reset
    resetPasswordExpires: Date,  // Expiration time for the reset token
    createdAt: Date,
    updatedAt: Date
}