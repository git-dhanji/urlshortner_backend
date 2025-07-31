
import priceModel from "../../models/price.model.js";
const price = [
    {
        name: "trail",
        price: "$1",
        amount: 1,
        period: "month",
        features: ["1,000 links/month", "Basic analytics", "Standard support"],
        popular: false
    },
    {
        name: "Pro",
        price: "$5",
        amount: 5,
        period: "monthly",
        features: ["Unlimited links", "Advanced analytics", "Custom domains (future)", "Priority support"],
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        amount: 10,
        period: "pricing",
        features: ["Everything in Pro", "Team collaboration", "API access", "Dedicated support"],
        popular: false
    }


]

const insertPrice = async () => {
    const planNames = price.map(p => p.name);
    // Update or insert each price plan
    for (const plan of price) {
        await priceModel.updateOne(
            { name: plan.name },
            { $set: plan },
            { upsert: true }
        );
    }
    // Remove any outdated plans not in current array
    await priceModel.deleteMany({ name: { $nin: planNames } });
};

export default insertPrice;
