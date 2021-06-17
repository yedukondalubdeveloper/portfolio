import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    background: transparent;

    .img {
      filter: none;
      mix-blend-mode: normal;
    }

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      ${'' /* border-radius: var(--border-radius); */}
      ${'' /* mix-blend-mode: multiply; */}
      ${'' /* filter: grayscale(100%) contrast(1); */}
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      golf: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "zach-golf.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Node.js',
    'Angular 9',
    'NestJS / Express',
    'React',
    'Digital Ocean',
    'WordPress',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>I'm a builder at heart. I've refinished golf putters, built leather wallets,</p>

            <p>My web development journey started on a golf course.</p>

            <p>
              Nothing fancy, just an amateur-looking WordPress site that I called "The DIY Golfer"
              (I've made a{' '}
              <a href="https://www.thediygolfer.com">few improvements over the years</a>)
            </p>

            <p>
              A year passed, and while I was having fun being a "blogger", I had a problem–I
              couldn't modify my site how I wanted to.
            </p>

            <p>
              I realized that I either needed to learn how to code, or pay someone a lot of money
              (which I didn't have).
            </p>

            <p>
              Over winter break of my senior year, I started Harvard's CS50 course. I took that
              course on the road with me to all my golf tournaments and woke up early to get it done
              before my Finance classes. It was tough, but gave me momentum.
            </p>

            <p>
              Since that semester, I built a computer (Nand2Tetris), attended the 42 Coding
              bootcamp, worked at a blockchain startup, and most recently, launched an online golf
              learning platform called{' '}
              <a href="https://training.thediygolfer.com/courses">Eagle Eye Performance</a> along
              with reaching 4,000 subscribers on my{' '}
              <a href="https://www.youtube.com/channel/UCDwIw3MiPJXu5SavbZ3_a2A">
                software YouTube channel.
              </a>
            </p>

            <p>
              Here are technologies and frameworks that I've been working in most actively over the
              last several years.
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.golf.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
