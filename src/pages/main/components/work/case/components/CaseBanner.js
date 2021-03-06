import clsx from "clsx";
import { motion } from "framer-motion";
export default function CaseBanner({ caseDetails }) {
    const { title, bannerDetails, date, description, tools, color } =
        caseDetails;
    const variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
            },
        },
    };
    return (
        <div className="banner-outer">
            <div className="banner-inner">
                <div className="left">
                    <motion.div
                        className="banner-details"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="title">{title}</div>
                        <div className="description">{description}</div>
                        <div className="case-date">{date}</div>
                        <div className="tools">{tools}</div>
                    </motion.div>
                </div>
                <div
                    className="right"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        className="banner-details"
                    >
                        {Object.entries(bannerDetails).map(
                            ([key, value], index1) => {
                                return (
                                    <div className="item" key={key + index1}>
                                        <div className="title">{key}</div>
                                        <div
                                            className={clsx(
                                                "body",
                                                "body-" + key
                                            )}
                                        >
                                            {value.map((line, index2) => (
                                                <div
                                                    key={key + index1 + index2}
                                                >
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
