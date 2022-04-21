import React, { useCallback, useEffect, useState } from 'react';
import classes from './index.module.scss'
import { Props } from '../'
import { BlockContainer } from '@root/layout/BlockContainer';
import Form from '@root/forms/Form';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { Select } from '@root/forms/fields/Select';
import { useRouter } from 'next/router';
// import { Housing as HousingType, HousingCategories } from '';

type Field = {
  label: string,
  value: string
};

export const ArchiveControls: React.FC<Props> = (props) => {
  const {
    controlsToShow: {
      categories: showCategories,
      city: showCity
    } = {},
  } = props;

  const router = useRouter();
  const { query } = router;
  const [cities, setCities] = useState<Field[]>([]);
  const [categories, setCategories] = useState<Field[]>([]);

  const setQueryParam = useCallback((paramName, paramValue?: string) => {
    router.push(
      {
        query: {
          ...router.query,
          [paramName]: paramValue
        },
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  const getAllCities = useCallback(() => {
    if (showCity) {
      const makeRequest = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/housing?limit=200`);
        const json = await req.json();

        const {
          docs: allHousingUnits
        } = json as {
          docs: HousingType[]
        };

        if (allHousingUnits && Array.isArray(allHousingUnits) && allHousingUnits.length > 0) {
          const allCities: Field[] = [];

          allHousingUnits.forEach((unit) => {
            const {
              address: {
                city
              } = {}
            } = unit

            if (city) {
              const notAlreadyIn = allCities.findIndex((c) => c.value === city) === -1;
              if (notAlreadyIn) {
                allCities.push({
                  label: city,
                  value: city
                })
              }
            }
          });

          setCities(allCities);
        }
      }

      makeRequest();
    }
  }, [showCity])

  const getAllCategories = useCallback(() => {
    if (showCategories) {
      const makeRequest = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/housing-categories?limit=200`);
        const json = await req.json();

        const {
          docs: allHousingCategories
        } = json as {
          docs: HousingCategories
        };
        if (allHousingCategories && Array.isArray(allHousingCategories) && allHousingCategories.length > 0) {
          const categoriesAsFields = allHousingCategories.map((category) => {
            const {
              title,
              slug
            } = category;

            return ({
              label: title || '',
              value: slug || ''
            })
          })

          setCategories(categoriesAsFields);
        }
      }

      makeRequest();
    }
  }, [showCategories])

  useEffect(() => {
    getAllCities();
    getAllCategories();
  }, [
    getAllCities,
    getAllCategories
  ])

  return (
    <BlockContainer cellClassName={classes.archiveControls}>
      <Form
        className={classes.controls}
        initialState={{
          city: {
            initialValue: query.city
          },
          categories: {
            initialValue: query.categories
          }
        }}
      >
        <Grid>
          {showCity && (
            <Cell
              cols={6}
              colsM={8}
            >
              <Select
                label="City"
                path="city"
                onChange={(incomingCity) => {
                  setQueryParam('city', incomingCity)
                }}
                options={cities}
                marginBottom={false}
              />
            </Cell>
          )}
          {showCategories && (
            <Cell
              cols={6}
              colsM={8}
            >
              <Select
                label="Category"
                path="categories"
                onChange={(incomingCategory) => {
                  setQueryParam('categories', incomingCategory)
                }}
                marginBottom={false}
                options={[
                  {
                    label: 'All',
                    value: ''
                  },
                  ...categories
                ]}
              />
            </Cell>
          )}
        </Grid>
      </Form>
    </BlockContainer>
  )
}
