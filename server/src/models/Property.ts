import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description?: string;
  price: number; // Precio en USD
  location?: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  featured: boolean;
  type?: string;
  status?: string;
  createdAt: Date;
  lat?: number;
  lng?: number;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    trim: true,
    maxlength: 200
  },
  address: {
    type: String,
    trim: true,
    maxlength: 300
  },
  bedrooms: {
    type: Number,
    min: 0,
    max: 50
  },
  bathrooms: {
    type: Number,
    min: 0,
    max: 50
  },
  images: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['Casa', 'Departamento', 'Local', 'Terreno', 'Oficina', 'Campo', 'Desarrollo'],
    trim: true
  },
  status: {
    type: String,
    enum: ['En venta', 'En alquiler', 'Vendido', 'Alquilado', 'Reservado'],
    default: 'En venta',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lat: {
    type: Number,
    min: -90,
    max: 90
  },
  lng: {
    type: Number,
    min: -180,
    max: 180
  }
});

// Índices para búsquedas eficientes
propertySchema.index({ type: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ createdAt: -1 });

// Índice compuesto para consultas comunes
propertySchema.index({ status: 1, type: 1, createdAt: -1 });
propertySchema.index({ featured: 1, createdAt: -1 });

export const Property = mongoose.model<IProperty>('Property', propertySchema);