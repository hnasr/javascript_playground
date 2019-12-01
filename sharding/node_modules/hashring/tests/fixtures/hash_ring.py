from hash_ring import HashRing
import unittest

class HashRingTest(unittest.TestCase):

    def setUp(self):
        self.weights = {
            '0.0.0.1': 1,
            '0.0.0.2': 2,
            '0.0.0.3': 3,
            '0.0.0.4': 4,
            '0.0.0.5': 5
        }

    def test_points(self):
        ring = HashRing(self.weights.keys(), self.weights)

        for i in xrange(0, 100000):
            print i, ring.get_node(str(i))

if __name__ == "__main__":
    unittest.main()
