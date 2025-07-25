// File: components/add-room-form-components.tsx
import React from "react";
import { useField } from "formik";
import { Plus, Minus } from "lucide-react";

// Replace missing components with basic versions
const Label = ({ htmlFor, children }: any) => (
  <label htmlFor={htmlFor} className="text-sm font-medium block mb-1">
    {children}
  </label>
);

const Input = ({ id, placeholder, ...props }: any) => (
  <input
    id={id}
    placeholder={placeholder}
    {...props}
    className="w-full p-2 border border-gray-300 rounded-md"
  />
);

const Textarea = ({ id, placeholder, ...props }: any) => (
  <textarea
    id={id}
    placeholder={placeholder}
    {...props}
    className="w-full p-2 border border-gray-300 rounded-md"
  />
);

const Button = ({ type = "button", size = "md", children, onClick }: any) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-2 py-1 text-sm rounded-md border border-gray-300 ${
      size === "sm" ? "text-sm" : "text-base"
    }`}
  >
    {children}
  </button>
);

const ToggleGroup = ({ value, onValueChange, children }: any) => (
  <div className="flex gap-2">
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        isActive: child.props.value === value,
        onClick: () => onValueChange(child.props.value)
      })
    )}
  </div>
);

const ToggleGroupItem = ({ value, isActive, onClick, children }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-1 rounded-md border text-sm ${
      isActive ? "bg-blue-600 text-white" : "bg-white text-gray-700"
    }`}
  >
    {children}
  </button>
);

// 1. Field
export const Field = ({ label, name, textarea = false, placeholder = "" }: any) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error;

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} {...field} placeholder={placeholder} />
      ) : (
        <Input id={name} {...field} placeholder={placeholder} />
      )}
      {error && <div className="text-sm text-red-500">{meta.error}</div>}
    </div>
  );
};

// 2. Counter
export const Counter = ({ label, name }: any) => {
  const [field, , helpers] = useField(name);
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" onClick={() => helpers.setValue(Math.max(0, field.value - 1))}><Minus /></Button>
        <span className="w-6 text-center">{field.value}</span>
        <Button type="button" size="sm" onClick={() => helpers.setValue(field.value + 1)}><Plus /></Button>
      </div>
    </div>
  );
};

// 3. ToggleGroup
export const SharedPrivateToggle = ({ name }: { name: string }) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="space-y-1">
      <Label>Room Type</Label>
      <ToggleGroup value={field.value} onValueChange={(val: string) => helpers.setValue(val)}>
        <ToggleGroupItem value="shared">Shared</ToggleGroupItem>
        <ToggleGroupItem value="private">Private</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

// 4. Upload Photos
export const UploadPhotos = ({ images }: { images: string[] }) => {
  return (
    <div>
      <Label>Photos</Label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {images.map((img, idx) => (
          <img key={idx} src={img} className="rounded-lg object-cover w-full h-24" alt="Uploaded" />
        ))}
      </div>
    </div>
  );
};

// 5. Upload Video
export const UploadVideo = ({ url }: { url: string }) => {
  return (
    <div className="space-y-1">
      <Label>Video</Label>
      <video src={url} className="w-full rounded-lg" controls />
    </div>
  );
};

// 6. Seasonal Rate
export const SeasonalRate = ({ season, date, price }: { season: string; date: string; price: string }) => (
  <div className="flex justify-between items-center border p-2 rounded-md">
    <div>
      <p className="text-sm font-medium">{season}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
    <span className="text-sm font-semibold">{price}</span>
  </div>
);

// 7. Discount
export const Discount = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border p-2 rounded-md">
    <p className="text-sm font-medium">{label}</p>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);
