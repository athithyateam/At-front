import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiCamera, FiUser, FiInfo } from "react-icons/fi";
import { updateProfileApi } from "../../api/profileApi";

export default function EditProfileModal({ user, onClose, onUpdate }) {
    const [firstname, setFirstname] = useState(user.firstname || "");
    const [lastname, setLastname] = useState(user.lastname || "");
    const [description, setDescription] = useState(user.description || "");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(user.avatar?.url || user.avatar || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) {
                setError("File size must be less than 3MB");
                return;
            }
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("firstname", firstname);
            formData.append("lastname", lastname);
            formData.append("description", description);
            if (avatar) {
                formData.append("avatar", avatar);
            }

            const res = await updateProfileApi(formData);
            if (res.success) {
                if (onUpdate) onUpdate(res.user);
                onClose();
            } else {
                setError(res.message || "Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200/50 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {error}
                        </div>
                    )}

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-50 shadow-2xl bg-gray-100">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <FiUser className="w-14 h-14" />
                                    </div>
                                )}
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-[2px]">
                                <FiCamera className="text-white w-8 h-8 transform group-hover:scale-110 transition-transform" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Change Profile Photo</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#C59A2F]/10 focus:border-[#C59A2F] outline-none transition-all font-semibold text-gray-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#C59A2F]/10 focus:border-[#C59A2F] outline-none transition-all font-semibold text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            Bio / Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Share your travel stories or what you host..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#C59A2F]/10 focus:border-[#C59A2F] outline-none transition-all resize-none font-medium text-gray-700 leading-relaxed"
                        />
                    </div>

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 px-6 border border-gray-100 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all uppercase tracking-widest text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-4 px-6 bg-[#C59A2F] text-white font-bold rounded-2xl shadow-xl shadow-yellow-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
