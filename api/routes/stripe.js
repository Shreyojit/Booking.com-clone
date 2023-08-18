import express from "express";
const KEY = process.env.STRIPE_KEY;

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MxQNfSG18ruPwhpg53pBuAMbhqtI5UIbOuko4MVGp211vkxy4vxkcOkcoHJHwHGNoIim82y8cAnBokTJe2oKBLI0046NQD33g');

const router = express.Router();

router.post("/create-checkout-session", async (req, res)=>{
  try{
      const session = await stripe.checkout.sessions.create({
          payment_method_types:["card"],
          mode:"payment",
          line_items: req.body.items.map(item => {
              return{
                  price_data:{
                      currency:"usd",
                      product_data:{
                          name: item.name
                      },
                      unit_amount: (item.price)*100,

                  },
                  quantity: item.quantity
              }
          }),
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel'
      })

      res.json({url: session.url})

  }catch(e){
   res.status(500).json({error:e.message})
  }
})

export default router;