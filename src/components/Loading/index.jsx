import CustomModal from "../Modal";
import Image from "next/image";
import EndlessKnot from "./../../../public/endless-knot-only.svg";
import BaseEndlessKnot from "./../../../public/base-endless-knot.svg";
import styles from './styles.module.css';

export default function Loading({ isLoading }) {
    return <CustomModal
        closeWhenClickOutsideContent={false}
        isOpen={isLoading}
        className="bg-black/95 border-none absolute top-0 gap-5 left-0 flex flex-col w-full justify-center items-center select-none"
    >
        <div className={styles.spinning}>
            <Image
                priority
                width={70}
                height={70}
                src={EndlessKnot}
                alt="Logo TrainifyMe"
            />
        </div>

        <div>
            <Image
                priority
                width={50}
                src={BaseEndlessKnot}
                alt="Base da logo TrainifyMe"
            />
        </div>

        <div>
            <h1 className="text-white text-lg text-center">
                Carregando..
            </h1>
        </div>

    </CustomModal>
}