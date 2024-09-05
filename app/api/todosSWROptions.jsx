// export const addInterpretationOptions = (newInterpretation) => {
//   return {
//     // Optimistic update: Display new interpretation immediately
//     optimisticData: (interpretations) =>
//       [...interpretations, newInterpretation].sort((a, b) =>
//         b.$id.localeCompare(a.$id)
//       ),
//     rollbackOnError: true,
//     // Cache update: Add new interpretation to cache
//     populateCache: (added, interpretations) =>
//       [...interpretations, added].sort((a, b) => b.$id.localeCompare(a.$id)),
//     revalidate: false,
//   };
// };

// export const updateInterpretationOptions = (updatedInterpretation) => {
//   return {
//     // Optimistic update: Replace old interpretation with updated one
//     optimisticData: (interpretations) => {
//       const prevInterpretations = interpretations.filter(
//         (interpretation) => interpretation.$id !== updatedInterpretation.$id
//       );
//       return [...prevInterpretations, updatedInterpretation].sort((a, b) =>
//         b.$id.localeCompare(a.$id)
//       );
//     },
//     rollbackOnError: true,
//     // Cache update: Replace old interpretation with updated one
//     populateCache: (updated, interpretations) => {
//       const prevInterpretations = interpretations.filter(
//         (interpretation) => interpretation.$id !== updatedInterpretation.$id
//       );
//       return [...prevInterpretations, updated].sort((a, b) =>
//         b.$id.localeCompare(a.$id)
//       );
//     },
//     revalidate: false,
//   };
// };

// export const deleteInterpretationOptions = ({ id }) => {
//   return {
//     // Optimistic update: Remove interpretation from the UI
//     optimisticData: (interpretations) =>
//       interpretations.filter((interpretation) => interpretation.$id !== id),
//     rollbackOnError: true,
//     // Cache update: Remove interpretation from cache
//     populateCache: (emptyResponseObj, interpretations) =>
//       interpretations.filter((interpretation) => interpretation.$id !== id),
//     revalidate: false,
//   };
// };
