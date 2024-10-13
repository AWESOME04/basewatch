import { LatLngTuple } from 'leaflet';

export const pollutionZones: Array<{center: LatLngTuple, radius: number, color: string, intensity: string}> = [
  { center: [5.6037, -0.1870], radius: 20000, color: '#FF0000', intensity: 'high' },    // Accra
  { center: [6.6885, -1.6244], radius: 15000, color: '#FFA500', intensity: 'medium' },   // Kumasi
  { center: [9.4075, -0.8533], radius: 10000, color: '#008000', intensity: 'low' },      // Tamale
  { center: [10.4075, -0.8533], radius: 10000, color: '#008000', intensity: 'low' },     // Upper East
  { center: [9.4075, -1.8533], radius: 10000, color: '#008000', intensity: 'low' },      // Upper West
  { center: [5.8142, 0.0747], radius: 18000, color: '#FF0000', intensity: 'high' },      // Tema
  { center: [6.0965, -0.2412], radius: 12000, color: '#FFA500', intensity: 'medium' },   // Koforidua
  { center: [7.0965, -0.2412], radius: 12000, color: '#FFA500', intensity: 'medium' },   // Techiman
  { center: [7.0965, -1.2412], radius: 12000, color: '#FFA500', intensity: 'medium' },   // Sunyani
  { center: [8.0965, -0.2412], radius: 12000, color: '#FF0000', intensity: 'high' },     // Wa
  { center: [8.0965, -0.2412], radius: 12000, color: '#FF0000', intensity: 'high' },     // Bolgatanga
  { center: [8.0965, -0.2412], radius: 12000, color: '#FF0000', intensity: 'high' },     // Bawku
  
  { center: [5.1104, -1.2414], radius: 18000, color: '#FF0000', intensity: 'high' },     // Cape Coast
  { center: [6.4462, -2.2344], radius: 13000, color: '#FFA500', intensity: 'medium' },   // Takoradi
  { center: [5.1982, -2.5274], radius: 11000, color: '#FFA500', intensity: 'medium' },   // Elmina
  { center: [6.1256, 1.2217], radius: 10000, color: '#008000', intensity: 'low' },       // Aflao
  { center: [6.4210, 0.4307], radius: 9000, color: '#008000', intensity: 'low' },        // Ho
  { center: [8.5500, -0.7500], radius: 15000, color: '#FF0000', intensity: 'high' },     // Damongo
  { center: [6.8538, -1.6636], radius: 16000, color: '#FF0000', intensity: 'high' },     // Ejura
  { center: [7.0723, -1.3095], radius: 12000, color: '#FFA500', intensity: 'medium' },   // Offinso
  { center: [5.9260, -0.1721], radius: 18000, color: '#FF0000', intensity: 'high' },     // Kasoa
];

export const mapCenter: LatLngTuple = [7.9465, -1.0232];
export const defaultZoom = 7;
