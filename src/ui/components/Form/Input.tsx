"use client";
import React, { useReducer } from "react";

type TInputState = {
    value: string;
};

type TInputReducerAction = {
    type: "CHANGE";
    value: string;
};

type BaseProps = {
    element: "input" | "textarea"; // نوع المنت مشخص می‌کنه کدوم استفاده میشه
    labelTitle?: string;
    label?: string;
};

type InputProps =
    | (BaseProps &
          React.InputHTMLAttributes<HTMLInputElement> & { element: "input" })
    | (BaseProps &
          React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
              element: "textarea";
          });

const inputReducer = (state: TInputState, action: TInputReducerAction) => {
    switch (action.type) {
        case "CHANGE": {
            return {
                ...state,
                value: action.value,
            };
        }
        default: {
            return state;
        }
    }
};

export default function Input(props: InputProps) {
    const [mainInput, dispatch] = useReducer(inputReducer, {
        value: "",
    });

    const onChangeHandler = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch({
            value: event.target.value,
            type: "CHANGE",
        });
    };

    const element = () => {
        return (
            (props.element === "input" && (
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    className={props.className}
                    onChange={onChangeHandler}
                    value={mainInput.value}
                    dir={props.dir}
                />
            )) ||
            (props.element === "textarea" && (
                <textarea
                    className={props.className}
                    placeholder={props.placeholder}
                    onChange={onChangeHandler}
                    value={mainInput.value}
                ></textarea>
            ))
        );
    };

    return (
        <div className="w-full">
            {props.label ? (
                <div className="flex flex-col gap-2 items-start w-full">
                    <label className="text-xs font-YekanBakh-SemiBold">
                        {props.labelTitle}
                    </label>
                    {element()}
                </div>
            ) : (
                <div>{element()}</div>
            )}
        </div>
    );
}
