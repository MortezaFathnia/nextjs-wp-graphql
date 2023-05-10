import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    console.log(filters)
    if (filters.hasParking) {
      hasParkingFilter = `{key: "has_parking", compare: EQUAL_TO, value: "1"}`
    }

    if (filters.petFriendly) {
      petFriendlyFilter = `{key: "pet_friendly", compare: EQUAL_TO, value: "1"}`
    }

    if (filters.minPrice) {
      minPriceFilter = ` {key: "price", compare: GREATER_THAN_OR_EQUAL_TO, value: "${filters.minPrice}", type: NUMERIC}`
    }

    if (filters.maxPrice) {
      maxPriceFilter = ` {key: "price", compare: LESS_THAN_OR_EQUAL_TO, value: "${filters.maxPrice}", type: NUMERIC}`
    }

    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties(
            where: {
              offsetPagination: {offset:${((filters.page || 1) - 1) * 3}, size: 3},
              metaQuery: {relation: AND,
                metaArray: [
                  ${hasParkingFilter}
                  ${petFriendlyFilter}
                  ${minPriceFilter}
                  ${maxPriceFilter}
                ]}
          }) 
          {
            nodes {
              databaseId
              uri
              title
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
        `
    });
    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes
    })
  } catch (error) {
    console.log('error:', error);
  }
}

export default handler;