
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/mockData";
import { toast } from "sonner";
import { Edit, Trash2, Plus } from "lucide-react";

const AdminCategoriesPage = () => {
  const [categoriesList, setCategoriesList] = useState(categories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCategory = () => {
    setCurrentCategory({
      id: `new-${Date.now()}`,
      name: "",
      slug: "",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      description: "",
      productCount: 0,
    });
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory({ ...category });
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = () => {
    setCategoriesList(categoriesList.filter(c => c.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    toast.success(`Category "${currentCategory.name}" has been deleted.`);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    
    if (currentCategory.id.includes("new-")) {
      // Add new category
      setCategoriesList([...categoriesList, { ...currentCategory, id: Date.now().toString() }]);
      toast.success("Category added successfully!");
    } else {
      // Update existing category
      setCategoriesList(categoriesList.map(c => 
        c.id === currentCategory.id ? currentCategory : c
      ));
      toast.success("Category updated successfully!");
    }
    
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name
    if (name === "name") {
      setCurrentCategory({
        ...currentCategory,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
      });
    } else {
      setCurrentCategory({ ...currentCategory, [name]: value });
    }
  };

  const filteredCategories = categoriesList.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Categories">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:max-w-xs">
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddCategory} className="bg-umi-orange hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {category.productCount} Products
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 mr-2"
                  onClick={() => handleEditCategory(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteCategory(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="py-8 text-center bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No categories found.</p>
        </div>
      )}

      {/* Edit/Add Category Dialog */}
      {currentCategory && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentCategory.id.includes("new-") ? "Add New Category" : "Edit Category"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentCategory.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={currentCategory.slug}
                  onChange={handleInputChange}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Used in URLs (e.g., /products?category=makeup)
                </p>
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={currentCategory.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentCategory.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="productCount">Product Count</Label>
                <Input
                  id="productCount"
                  name="productCount"
                  type="number"
                  min="0"
                  value={currentCategory.productCount}
                  onChange={(e) => setCurrentCategory({
                    ...currentCategory,
                    productCount: parseInt(e.target.value) || 0
                  })}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  This would typically be calculated automatically in a real system
                </p>
              </div>
              
              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-umi-orange hover:bg-orange-700">
                  Save Category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the category "{currentCategory?.name}"?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteCategory}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
