// recipes searchbar

import {Link} from "react-router-dom";
import React from "react";

{/*{*/}
{/*    recipes.filter(recipe => {*/}
{/*        if (query === "") {*/}
{/*            return recipe;*/}
{/*        } else if (recipe.title.toLowerCase().includes(query.toLowerCase())) {*/}
{/*            return recipe;*/}
{/*        }*/}
{/*    }).map((recipe) => (*/}
{/*        <p>{recipe.title}</p>*/}
{/*    ))*/}
{/*}*/}


{/*{*/}
{/*    recipes.filter(recipe => {*/}
{/*        if (query === "") {*/}
{/*            return recipe;*/}
{/*        } else {*/}
{/*            for (let i = 0; i < recipe.months.length; i++) {*/}
{/*                if (recipe.months[i].toLowerCase().includes(query.toLowerCase())*/}
{/*                    || (recipe.months[i].toLowerCase().includes("jaarrond"))) {*/}
{/*                    return recipe;*/}
{/*                }*/}
{/*            }*/}
{/*        }*/}
{/*    }).map((recipe, index) => (*/}
{/*        <div key={index} className="recipes__div--flex">*/}
{/*            <p>{recipe.title}</p>*/}
{/*        </div>*/}
{/*    ))*/}
{/*}*/}


{/*{*/}
{/*    recipes.filter(recipe => {*/}
{/*        if (query === "") {*/}
{/*            return recipe;*/}
{/*        } else {*/}
{/*            for (let i = 0; i < recipe.tags.length; i++) {*/}
{/*                if (recipe.tags[i].toLowerCase().includes(query.toLowerCase())) {*/}
{/*                    return recipe;*/}
{/*                }*/}
{/*            }*/}
{/*        }*/}
{/*    }).map((recipe) => (*/}
{/*        <p key={recipe.id}>{recipe.title}</p>*/}
{/*    ))*/}
{/*}*/}


{/*{*/}
{/*    recipes.filter(recipe => {*/}
{/*        if (query === "") {*/}
{/*            return recipe;*/}
{/*        } else {*/}
{/*            for (let i = 0; i < recipe.ingredients.length; i++) {*/}
{/*                if (recipe.ingredients[i].ingredient_name.toLowerCase().includes(query.toLowerCase())) {*/}
{/*                    return recipe;*/}
{/*                }*/}
{/*            }*/}
{/*        }*/}
{/*    }).map((recipe) => (*/}
{/*        <p key={recipe.id}>{recipe.title}</p>*/}
{/*    ))*/}
{/*}*/}

// <ul className="recipes__ul">
//     <div className="recipes__div">
//         {recipes.map((recipe) => {
//             return <li key={recipe.id}
//                        className="recipes__li">
//                 <Link
//                     to={"/recipe/" + recipe.id}
//                     className="recipes__a"
//                 >
//                     {recipe.file &&
//                         <img
//                             src={recipe.file.url}
//                             alt={recipe.name}
//                             className="recipes__image"
//                         />}
//                     {recipe.title}
//                 </Link>
//             </li>
//         })}
//     </div>
// </ul>
//
//
// <article className="recipes__article--flex">
//     {((query === "") && (month.includes("selecteer") && tag.includes("selecteer")) &&
//         recipes.filter(recipe => {
//             return recipe;
//         }).map((recipe) => (
//             <ul className="recipes__ul">
//                 <div>
//                     <li key={recipe.id}
//                         className="recipes__li">
//                         <Link
//                             to={"/recipe/" + recipe.id}
//                             className="recipes__a"
//                         >
//                             {recipe.file &&
//                                 <img
//                                     src={recipe.file.url}
//                                     alt={recipe.name}
//                                     className="recipes__image"
//                                 />}
//                             {recipe.title}
//                         </Link>
//                     </li>
//                 </div>
//             </ul>
//         )))
//     }
// </article>
//
// {query !== "" &&
// <h3 className="recipes__h3">Geselecteerd op zoekterm "{query}"</h3>}
// <article className="recipes__article--flex">
//     {query !== "" &&
//         recipes.filter(recipe => {
//             if (query === "") {
//                 return recipe;
//                 //if query is not empty alias else
//             } else if (recipe.title.toLowerCase().includes(query.toLowerCase())) {
//                 return recipe;
//             } else {
//                 //search for ingredients
//                 for (let i = 0; i < recipe.ingredients.length; i++) {
//                     if (recipe.ingredients[i].ingredient_name.toLowerCase().includes(query.toLowerCase())) {
//                         return recipe;
//                     }
//                 }
//             }
//         }).map((recipe) => (
//             <ul className="recipes__ul">
//                 <div>
//                     <li key={recipe.id}
//                         className="recipes__li">
//                         <Link
//                             to={"/recipe/" + recipe.id}
//                             className="recipes__a"
//                         >
//                             {recipe.file &&
//                                 <img
//                                     src={recipe.file.url}
//                                     alt={recipe.name}
//                                     className="recipes__image"
//                                 />}
//                             {recipe.title}
//                         </Link>
//                     </li>
//                 </div>
//             </ul>
//         ))
//     }
// </article>
//
//
// {!month.includes("selecteer") &&
// <h3 className="recipes__h3">Geselecteerd op de maand {month}, inclusief jaarrond</h3>}
// <article className="recipes__article--flex">
//     {!month.includes("selecteer") && (
//         recipes.filter(recipe => {
//             for (let i = 0; i < recipe.months.length; i++) {
//                 if (recipe.months[i].toLowerCase().includes(month.toLowerCase())
//                     || (recipe.months[i].toLowerCase().includes("jaarrond"))) {
//                     return recipe;
//                 }
//             }
//         }).map((recipe) => (
//             <>
//                 <ul className="recipes__ul">
//                     <div>
//                         <li key={recipe.id}
//                             className="recipes__li">
//                             <Link
//                                 to={"/recipe/" + recipe.id}
//                                 className="recipes__a"
//                             >
//                                 {recipe.file &&
//                                     <img
//                                         src={recipe.file.url}
//                                         alt={recipe.name}
//                                         className="recipes__image"
//                                     />}
//                                 {recipe.title}
//                             </Link>
//                         </li>
//                     </div>
//                 </ul>
//             </>
//         )))
//     }
// </article>
//
//
// {!tag.includes("selecteer") && <h3 className="recipes__h3">Geselecteerd op categorie {tag}</h3>}
// <article className="recipes__article--flex">
//     {!tag.includes("selecteer") && (
//         recipes.filter(recipe => {
//             for (let i = 0; i < recipe.tags.length; i++) {
//                 if (recipe.tags[i].toLowerCase().includes(tag.toLowerCase())) {
//                     return recipe;
//                 }
//             }
//         }).map((recipe) => (
//             <>
//                 <ul className="recipes__ul">
//                     <div>
//                         <li key={recipe.id}
//                             className="recipes__li">
//                             <Link
//                                 to={"/recipe/" + recipe.id}
//                                 className="recipes__a"
//                             >
//                                 {recipe.file &&
//                                     <img
//                                         src={recipe.file.url}
//                                         alt={recipe.name}
//                                         className="recipes__image"
//                                     />}
//                                 {recipe.title}
//                             </Link>
//                         </li>
//                     </div>
//                 </ul>
//             </>
//         )))
//     }
// </article>
// </section>
// )
// ;
// }
//
// export default Recipe;