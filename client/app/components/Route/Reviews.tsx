import Image from "next/image";
import image from "../../../public/assets/Profile.png";
import ReviewCard from "../../components/Review/ReviewCard";
import { styles } from "../../styles/style";
type Props = {};

export const reviews = [
  {
    name: "John Doe",
    rating: 4.5,
    avatar: image,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem repellendus necessitatibus natus atque nam eos quis minima veritatis earum sunt fugiat, perspiciatis vitae eaque quas laudantium autem, distinctio itaque. Et odit illum iste tenetur hic quis animi dolores consectetur",
  },
  {
    name: "John Doe",
    avatar: image,
    rating: 5,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem repellendus necessitatibus natus atque nam eos quis minima veritatis earum sunt fugiat, perspiciatis vitae eaque quas laudantium autem, distinctio itaque. Et odit illum iste tenetur hic quis animi dolores consectetur possimus repellendus aliquam voluptas nulla dolor, nostrum facere ullam, tempore nihil molestias odio officiis ipsam accusantium ducimus quas a. Itaque repudiandae, quos sed quae sit voluptatum possimus, suscipit ducimus quasi eum tenetur libero. Commodi eaque ",
  },
  {
    rating: 3,
    name: "John Doe",
    avatar: image,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem repellendus necessitatibus natus atque nam eos quis minima veritatis earum sunt fugiat, perspiciatis vitae eaque quas laudantium autem, distinctio itaque. Et odit illum iste tenetur hic quis animi dolores consectetur possimus repellendus aliquam voluptas nulla dolor, nostrum facere ullam, tempore nihil molestias odio officiis ipsam accusantium ducimus quas a. Itaque repudiandae, quos sed quae sit voluptatum possimus, suscipit ducimus quasi eum tenetur libero. Commodi eaque facere provident quisquam ",
  },
  {
    name: "John Doe",
    rating: 4.5,
    avatar: image,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    name: "John Doe",
    rating: 4,
    avatar: image,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem repellendus necessitatibus natus atque nam eos quis minima veritatis earum sunt fugiat, perspiciatis vitae eaque quas laudantium autem, distinctio itaque. Et odit illum iste",
  },
  {
    name: "John Doe",
    rating: 5,
    avatar: image,
    Profession: "Student | University of Education",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem repellendus necessitatibus natus atque nam eos quis minima veritatis earum sunt fugiat, perspiciatis vitae eaque quas laudantium autem, distinctio itaque. Et odit illum iste tenetur hic quis animi dolores consectetur possimus repellendus aliquam voluptas nulla dolor, nostrum facere ullam, tempore nihil molestias odio officiis ipsam accusantium ducimus quas a. Itaque repudiandae, quos sed quae sit voluptatum possimus, suscipit ducimus quasi eum tenetur libero. Commodi eaque facere provident quisquam cumque, voluptates tenetur possimus vitae a iure atque pariatur quaerat. Laborum non perferendis autem aspernatur, corrupti necessitatibus libero quae unde harum ullam!",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/business-img.png")}
            width={800}
            height={800}
            alt="business"
          />
        </div>

        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Student are <span className="text-gradient"> Our Strength</span>{" "}
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
            saepe. Totam libero nesciunt quas labore fuga voluptatem ipsa
            provident officia hic, quasi vel numquam, similique illo. Veniam sed
            eligendi ad labore qui unde omnis incidunt?
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((item: any, index: number) => (
            <ReviewCard item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
