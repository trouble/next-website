import React, { useCallback, useEffect, useState } from 'react';
import classes from './index.module.scss'
import { Props } from '../'
import { BlockContainer } from '@root/layout/BlockContainer';
import Form from '@root/forms/Form';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { Select } from '@root/forms/fields/Select';
import { useRouter } from 'next/router';
import { DocFromCMS } from '@root/cms/types';

type Field = {
  label: string,
  value: string
};

export const ArchiveControls: React.FC<Props> = (props) => {
  const {
    controlsToShow: {
      categories: showCategories,
    } = {},
  } = props;

  const router = useRouter();
  const { query } = router;
  const [categories, setCategories] = useState<Field[]>([]);

  const setQueryParam = useCallback((paramName: string, paramValue?: string) => {
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

  const getAllCategories = useCallback(() => {
    if (showCategories) {
      const makeRequest = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/housing-categories?limit=200`);
        const json = await req.json();

        const {
          docs: allCategories
        } = json as {
          docs: DocFromCMS[]
        };
        if (allCategories && Array.isArray(allCategories) && allCategories.length > 0) {
          const categoriesAsFields = allCategories.map((category) => {
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
    getAllCategories();
  }, [
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
