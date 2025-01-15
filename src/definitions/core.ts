import { z } from 'zod'

// Basic utility types with Zod
export const GenericCallbackSchema = z.function()
  .args(z.array(z.any()))
  .returns(z.any());


// React state hook type - keeping as type because it's a TypeScript utility type
export type StateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>];


// MasterContext schema
export const MasterContextSchema = z.record(
  z.string(),
  z.custom<StateHook<any>>()
);


// CoreFunctions schema
export const CoreFunctionsSchema = z.record(
  z.string(),
  z.function()
    .args(z.array(z.any()))
    .returns(z.any())
);

// Modal Identifier schema
export const ModalIdentifierSchema = z.enum([
	'contact-modal',
  	'newsletter-modal'
]);

export type GenericCallback = z.infer<typeof GenericCallbackSchema>;
export type MasterContext = z.infer<typeof MasterContextSchema>;
export type CoreFunctions = z.infer<typeof CoreFunctionsSchema>;
export type ModalIdentifier = z.infer<typeof ModalIdentifierSchema>;
