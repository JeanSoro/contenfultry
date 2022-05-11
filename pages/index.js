import { createClient } from 'contentful'
import { RecipeCards } from '../components/RecipeCards';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: 'recipe'
  })

  return {
    props: {
      recipes: res.items
    },
    revalidate: 1
  }
}



export default function Recipes({ recipes }) {
  console.log(recipes)
  return (
    <div className="recipe-list">
      {
        recipes.map((recipe) => {
          return (
            <RecipeCards key={recipe.sys.id} recipe={recipe} />
          )
        })
      }


      <style jsx>
        {
          ` 
            .recipe-list{
              display: grid;
              grid-template-columns :1fr 1fr;
              grid-gap: 20px 40px;
            }
          `
        }
      </style>

    </div>
  )
}