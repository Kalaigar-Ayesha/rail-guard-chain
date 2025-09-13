import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  Upload, 
  X, 
  FileImage,
  Calendar,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoEvidence {
  id: string;
  filename: string;
  url: string;
  description: string;
  partId?: string;
  inspectionId?: string;
  uploadDate: string;
  tags: string[];
}

interface PhotoUploaderProps {
  partId?: string;
  inspectionId?: string;
  onPhotosUploaded?: (photos: PhotoEvidence[]) => void;
}

const PhotoUploader = ({ partId, inspectionId, onPhotosUploaded }: PhotoUploaderProps) => {
  const [photos, setPhotos] = useState<PhotoEvidence[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one photo to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload - in real implementation, this would upload to server/database
    const newPhotos: PhotoEvidence[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Create blob URL for preview (in real app, this would be server URL)
      const url = URL.createObjectURL(file);
      
      const photo: PhotoEvidence = {
        id: `photo_${Date.now()}_${i}`,
        filename: file.name,
        url: url,
        description: description || `Evidence photo for ${partId || inspectionId || 'inspection'}`,
        partId,
        inspectionId,
        uploadDate: new Date().toISOString().split('T')[0],
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      newPhotos.push(photo);
    }

    // Add to photos state
    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    
    // Reset form
    setSelectedFiles(null);
    setDescription("");
    setTags("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    setIsUploading(false);
    
    // Call callback if provided
    onPhotosUploaded?.(updatedPhotos);

    toast({
      title: "Photos Uploaded Successfully",
      description: `${newPhotos.length} photo(s) uploaded and stored`,
    });
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    toast({
      title: "Camera Capture",
      description: "Camera feature would open here in mobile app",
    });
  };

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
    onPhotosUploaded?.(updatedPhotos);
    
    toast({
      title: "Photo Removed",
      description: "Photo has been removed from evidence",
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Interface */}
      <Card className="industrial-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Photo Evidence</span>
          </CardTitle>
          <CardDescription>
            Upload photos for inspection evidence and documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="photo-upload">Select Photos</Label>
            <div className="flex space-x-2">
              <Input
                id="photo-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button 
                onClick={handleCameraCapture}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Camera</span>
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what the photos show..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g., crack, wear, damage, installation"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Upload Button */}
          <Button 
            onClick={handleUpload}
            disabled={!selectedFiles || isUploading}
            className="w-full railway-gradient"
            size="lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Photos"}
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded Photos Gallery */}
      {photos.length > 0 && (
        <Card className="industrial-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileImage className="h-5 w-5" />
              <span>Uploaded Evidence ({photos.length})</span>
            </CardTitle>
            <CardDescription>
              Manage uploaded photo evidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="relative">
                  <CardContent className="p-4">
                    {/* Photo Preview */}
                    <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={photo.url} 
                        alt={photo.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Photo Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{photo.filename}</p>
                        <Button
                          onClick={() => removePhoto(photo.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {photo.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{photo.uploadDate}</span>
                      </div>
                      
                      {/* Tags */}
                      {photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {photo.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoUploader;