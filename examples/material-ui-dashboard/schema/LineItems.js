cube(`LineItems`, {
  sql: `SELECT * FROM public.line_items`,

  joins: {
    Products: {
      sql: `${CUBE}.product_id = ${Products}.id`,
      relationship: `belongsTo`
    },

    Orders: {
      sql: `${CUBE}.order_id = ${Orders}.id`,
      relationship: `belongsTo`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, created_at]
    },

    price: {
      sql: `price`,
      type: `sum`,
      format: `currency`
    },

    quantity: {
      sql: `quantity`,
      type: `sum`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    createdAt: {
      sql: `created_at`,
      type: `time`
    },

    itemPrice: {
      sql: `price`,
      type: `number`
    },
  }
});
