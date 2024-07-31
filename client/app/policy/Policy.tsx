import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3">
        <br />
        <br />
      <h1 className={`${styles.title} !text-start pt-2`}>
        Privacy Policy - ELearning
      </h1>
      <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt nostrum
          fugiat commodi saepe quo quibusdam quisquam nihil. Ad itaque
          temporibus quam libero, maxime voluptatum, consequatur ex iure ipsum
          dignissimos perspiciatis! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Sunt nostrum fugiat commodi saepe quo quibusdam
          quisquam nihil. Ad itaque temporibus quam libero, maxime voluptatum,
          consequatur ex iure ipsum dignissimos perspiciatis!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt nostrum
          fugiat commodi saepe quo quibusdam quisquam nihil. Ad itaque
          temporibus quam libero, maxime voluptatum, consequatur ex iure ipsum
          dignissimos perspiciatis! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Sunt nostrum fugiat commodi saepe quo quibusdam
          quisquam nihil. Ad itaque temporibus quam libero, maxime voluptatum,
          consequatur ex iure ipsum dignissimos perspiciatis!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt nostrum
          fugiat commodi saepe quo quibusdam quisquam nihil. Ad itaque
          temporibus quam libero, maxime voluptatum, consequatur ex iure ipsum
          dignissimos perspiciatis! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Sunt nostrum fugiat commodi saepe quo quibusdam
          quisquam nihil. Ad itaque temporibus quam libero, maxime voluptatum,
          consequatur ex iure ipsum dignissimos perspiciatis!
        </p>
      </ul>
      <br />
      <br />
    </div>
  );
};

export default Policy;
