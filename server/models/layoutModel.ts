import { Document, Model, Schema, model } from "mongoose";

interface FaqItem extends Document {
    question: string;
    answer: string;
}

interface Category extends Document{
    title: string;
}

interface BannerImage extends Document{
    public_id: string;
    url: string;
}

interface Layout extends Document {
    type: string;
    faq: FaqItem[];
    categories: Category[];
    banner: {
        image: [BannerImage];
        title: string;
        subtitle: string;
    }
}

const faqSchema = new Schema<FaqItem>({
    question: String,
    answer: String
})

const categoriesSchema = new Schema<Category>({
    title: String
})

const bannerImageSchema = new Schema<BannerImage>({
    public_id: String,
    url: String
})

const layoutSchema = new Schema<Layout>({
    type: String,
    faq: [faqSchema],
    categories: [categoriesSchema],
    banner: {
        image: bannerImageSchema,
        title: String,
        subtitle: String
    }
}, {timestamps: true})

const layoutModel: Model<Layout> = model("Layout", layoutSchema);
export default layoutModel;