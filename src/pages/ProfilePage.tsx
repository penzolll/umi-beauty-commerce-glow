
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    // In a real app, you'd update the user profile here
    toast.success("Profile updated successfully");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <Input 
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <Input 
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <Input 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="bg-umi-orange hover:bg-orange-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
