import { createSlice } from "@reduxjs/toolkit";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface TestimonialState {
  activeIndex: number;
  testimonials: Testimonial[];
}

const initialState: TestimonialState = {
  activeIndex: 0,
  testimonials: [
    {
      id: "1",
      name: "Alex M.",
      role: "Blockchain Analyst at WorldChain",
      text: "Fich makes crypto trading effortless. Fast transactions, low fees, and a sleek interface—exactly what I needed.",
      avatar: "AM",
    },
    {
      id: "2",
      name: "Sarah K.",
      role: "Portfolio Manager at DeFi Capital",
      text: "The advanced charting tools and real-time data have completely transformed how I manage my crypto portfolio.",
      avatar: "SK",
    },
    {
      id: "3",
      name: "James L.",
      role: "Independent Crypto Trader",
      text: "I've tried dozens of platforms and Fich stands out with its intuitive design and lightning-fast execution speed.",
      avatar: "JL",
    },
  ],
};

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    nextTestimonial(state) {
      state.activeIndex =
        (state.activeIndex + 1) % state.testimonials.length;
    },
    prevTestimonial(state) {
      state.activeIndex =
        (state.activeIndex - 1 + state.testimonials.length) %
        state.testimonials.length;
    },
    setTestimonialIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { nextTestimonial, prevTestimonial, setTestimonialIndex } =
  testimonialSlice.actions;
export default testimonialSlice.reducer;
